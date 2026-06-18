import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://xlbybfqnhbyexypqtrej.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYnliZnFuaGJ5ZXh5cHF0cmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3MDAwODcsImV4cCI6MjA5NzI3NjA4N30.g4wu75B02N1wRpontFFqj8mxTS92Nes-D4N7MwpE6iQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
