CREATE TABLE t_p14448152_data_analytics_initi.leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);