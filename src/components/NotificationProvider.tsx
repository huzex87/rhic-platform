"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useAuth } from './AuthProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { Megaphone, X, ShieldCheck } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    content: string;
    priority: 'Normal' | 'High' | 'Urgent';
    type: 'broadcast' | 'achievement' | 'alert';
    created_at: string;
}

interface NotificationContextType {
    notifications: Notification[];
    dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const supabase = createClient();

    useEffect(() => {
        if (!user) return;

        // Listen for new announcements in the user's state chapter or global ones
        const channel = supabase
            .channel('command-broadcasts')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'announcements',
                },
                (payload: { new: { id: string; title: string; content: string; priority: 'Normal' | 'High' | 'Urgent'; chapter_id: string | null; created_at: string } }) => {
                    const newAnn = payload.new;

                    // Only show if it matches user's chapter or is global (chapter_id is null)
                    if (!newAnn.chapter_id || newAnn.chapter_id === user.user_metadata?.chapter_id) {
                        const notification: Notification = {
                            id: newAnn.id,
                            title: newAnn.title,
                            content: newAnn.content,
                            priority: newAnn.priority,
                            type: 'broadcast',
                            created_at: newAnn.created_at,
                        };
                        setNotifications((prev) => [notification, ...prev]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, supabase]);

    const dismissNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, dismissNotification }}>
            {children}

            {/* Global Notification Overlay */}
            <div className="fixed top-24 right-6 z-[200] flex flex-col gap-4 w-full max-w-sm pointer-events-none">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            className="pointer-events-auto"
                        >
                            <div className={`p-1 rounded-2xl shadow-2xl ${n.priority === 'Urgent' ? 'bg-accent-red' :
                                n.priority === 'High' ? 'bg-leaf' : 'bg-forest'
                                }`}>
                                <div className="bg-ivory rounded-[14px] p-5 relative overflow-hidden group">
                                    {/* Subtle Background Icon */}
                                    <Megaphone className={`absolute -bottom-4 -right-4 w-20 h-20 opacity-[0.03] transition-transform group-hover:scale-110`} />

                                    <button
                                        onClick={() => dismissNotification(n.id)}
                                        className="absolute top-4 right-4 p-1 hover:bg-forest/5 rounded-full transition-colors"
                                    >
                                        <X className="w-4 h-4 text-forest/20" />
                                    </button>

                                    <div className="flex gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.priority === 'Urgent' ? 'bg-accent-red/10' :
                                            n.priority === 'High' ? 'bg-leaf/10' : 'bg-forest/10'
                                            }`}>
                                            {n.type === 'broadcast' ? (
                                                <Megaphone className={`w-5 h-5 ${n.priority === 'Urgent' ? 'text-accent-red' :
                                                    n.priority === 'High' ? 'text-leaf' : 'text-forest'
                                                    }`} />
                                            ) : (
                                                <ShieldCheck className="w-5 h-5 text-leaf" />
                                            )}
                                        </div>

                                        <div className="flex flex-col pr-6">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${n.priority === 'Urgent' ? 'bg-accent-red text-ivory' :
                                                    n.priority === 'High' ? 'bg-leaf/10 text-leaf' : 'bg-forest/10 text-forest/40'
                                                    }`}>
                                                    {n.priority}
                                                </span>
                                                <span className="text-[10px] font-bold text-forest/20 uppercase tracking-tighter">
                                                    Command Broadcast
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-black text-forest leading-tight mb-1">{n.title}</h4>
                                            <p className="text-xs text-forest/60 font-medium leading-relaxed line-clamp-2">{n.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
