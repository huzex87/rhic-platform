"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/components/AuthProvider";

export interface Proposal {
    id: string;
    author_id: string | null;
    title: string;
    excerpt: string;
    content: string | null;
    category: string;
    status: 'Trending' | 'Shortlisted' | 'Reviewing' | 'Implemented';
    votes_count: number;
    comments_count: number;
    created_at: string;
    user_has_voted?: boolean;
    author_name?: string;
}

interface ProposalVote {
    user_id: string;
}

interface RawProposal extends Proposal {
    proposal_votes: ProposalVote[];
}

export function useProposals(filter: 'Trending' | 'Most Voted' | 'Recent' | 'In Review' = 'Trending') {
    const { user } = useAuth();
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();

        let query = supabase
            .from("proposals")
            .select(`
                *,
                proposal_votes:proposal_votes(user_id)
            `);

        // Apply filtering logic
        if (filter === 'Trending') {
            query = query.order('votes_count', { ascending: false });
        } else if (filter === 'Most Voted') {
            query = query.order('votes_count', { ascending: false });
        } else if (filter === 'Recent') {
            query = query.order('created_at', { ascending: false });
        } else if (filter === 'In Review') {
            query = query.eq('status', 'Reviewing');
        }

        const { data, error: proposalsError } = await query;

        if (proposalsError) {
            setError(proposalsError.message);
            setLoading(false);
            return;
        }

        const rawData = (data || []) as unknown as RawProposal[];
        const processedProposals = rawData.map((p) => ({
            ...p,
            user_has_voted: p.proposal_votes?.some((v) => v.user_id === user?.id) || false
        }));

        setProposals(processedProposals);
        setLoading(false);
    }, [user, filter]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const toggleVote = async (proposalId: string) => {
        if (!user) return;
        const supabase = createClient();

        const { error: rpcError } = await supabase.rpc("toggle_proposal_vote", {
            proposal_id_param: proposalId
        });

        if (!rpcError) {
            // Optimistically update or just refetch
            setProposals(prev => prev.map(p => {
                if (p.id === proposalId) {
                    const hasVoted = !p.user_has_voted;
                    return {
                        ...p,
                        user_has_voted: hasVoted,
                        votes_count: hasVoted ? p.votes_count + 1 : p.votes_count - 1
                    };
                }
                return p;
            }));
        }
        return { error: rpcError };
    };

    const submitProposal = async (proposal: Partial<Proposal>) => {
        if (!user) return { data: null, error: new Error("User not authenticated") };
        const supabase = createClient();

        const { data, error } = await supabase
            .from("proposals")
            .insert({
                ...proposal,
                author_id: user.id
            })
            .select()
            .single();

        if (!error) {
            setProposals(prev => [data as Proposal, ...prev]);
        }
        return { data, error };
    };

    return { proposals, loading, error, toggleVote, submitProposal, refetch: fetchData };
}
