"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export interface MediaAsset {
    id: string;
    title: string;
    type: 'Image' | 'Video' | 'Graphics' | 'Document';
    format: string;
    size: string;
    download_url: string;
    category: string;
    created_at: string;
}

export function useMedia(selectedCategory: string = 'All') {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const supabase = createClient();

        let query = supabase
            .from("media_assets")
            .select("*")
            .order("created_at", { ascending: false });

        if (selectedCategory !== 'All') {
            query = query.eq("category", selectedCategory);
        }

        const { data, error: mediaError } = await query;

        if (mediaError) {
            setError(mediaError.message);
            setLoading(false);
            return;
        }

        setAssets(data || []);
        setLoading(false);
    }, [selectedCategory]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { assets, loading, error, refetch: fetchData };
}
