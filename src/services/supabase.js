
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tbtzuoaephqcacplktqh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidHp1b2FlcGhxY2FjcGxrdHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMTY3NTYsImV4cCI6MjAzNjc5Mjc1Nn0.h0UE65MrJaCru2fLwVDxILaph27XqYGba8mM60TRLQQ';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;