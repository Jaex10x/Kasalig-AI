import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qjebjowxupfomlyqdkfd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqZWJqb3d4dXBmb21seXFka2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTE2MTIsImV4cCI6MjA3NjM4NzYxMn0.b21Lq772g53t0Gf4zK1q3U-r-Q7-K9iVvjUfJqjYp04'
export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
