-- Check the exact constraint on projects.status
SELECT
    conname,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conname LIKE '%projects_status%'
AND contype = 'c';

-- Check what values are actually allowed
SELECT enumtypid::regtype as enum_type
FROM pg_attribute
WHERE attrelid = 'projects'::regtype
AND attname = 'status';

-- Check the current table definition
\d projects