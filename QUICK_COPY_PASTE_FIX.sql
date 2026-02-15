ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_status_check;

ALTER TABLE projects ADD CONSTRAINT projects_status_check
  CHECK (status IN ('active', 'completed', 'archived'));

INSERT INTO projects (user_id, title, input_type, input_content, intent, status)
VALUES ('da0fa46e-aed8-48e8-b63b-23506cbfe448', 'Fix Complete', 'text', 'Project creation is now working!', 'generate', 'active');


