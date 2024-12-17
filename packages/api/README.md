# API

## Example calls

```bash
curl -X POST http://localhost:5001/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "123456"}'

     curl -X POST http://localhost:5001/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "123456"}'
```

```sql
CREATE SCHEMA IF NOT EXISTS chat_dev;

CREATE TABLE IF NOT EXISTS chat_dev.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    terms_accepted BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by TEXT NOT NULL DEFAULT 'system',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by TEXT NOT NULL DEFAULT 'system'
);

CREATE INDEX IF NOT EXISTS idx_users_email ON chat_dev.users (email);
CREATE INDEX IF NOT EXISTS idx_users_username ON chat_dev.users (username);
```

---

```sql
CREATE TABLE sessions (
id SERIAL PRIMARY KEY,
user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
jwt_token TEXT NOT NULL,
expires_at TIMESTAMP NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

PGSSLMODE=require psql --dbname postgres --username admin --host kqabtwbmaz7seg5pbk2bj6vqt4.dsql.us-east-1.on.aw
```

s
