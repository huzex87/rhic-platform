
import { createClient } from '@supabase/supabase-js';

// Configuration for 100k Concurrent Simulation (Scaled for Local Test)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ehthkntdxnnulchhjblv.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodGhrbnRkeG5udWxjaGhqYmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzQ5MzcsImV4cCI6MjA4NjQxMDkzN30.XgXNLPvnD3AR5g0EHddHX3DCkwZ9r7ShNF0Vq7FzyjY';
const TOTAL_USERS = 100; // Simulated batch size per node
const MESSAGES_PER_SECOND = 10;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function simulateRealtimeLoad() {
    console.log(`🚀 Starting Load Simulation: ${TOTAL_USERS} concurrent listeners...`);

    const connections = Array.from({ length: TOTAL_USERS }).map((_, i) => {
        return supabase
            .channel(`load-test-${i}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activities' }, (payload) => {
                // console.log('Latent Activity Received');
            })
            .subscribe();
    });

    console.log('✅ Connections established. Monitoring throughput...');
}

async function simulateDatabaseContention() {
    console.log('🔥 Simulating Database Write Contention...');
    for (let i = 0; i < 50; i++) {
        await supabase.from('activities').insert({
            type: 'load_test',
            title: `Simulated Activity ${i}`,
            metadata: { stress: true }
        });
    }
}

// Execution
(async () => {
    await simulateRealtimeLoad();
    await simulateDatabaseContention();
    console.log('🏁 Simulation Complete. Check Supabase Dashboard for egress and latency.');
})();
