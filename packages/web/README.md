# Web

DSQL fills so many gaps that AWS was missing in the "database" space. I firmly believe it will make it challenging for "third-party" providers like Supabase or PlanetScale to keep up.

For me, the biggest issue has always been cost. I build side projects – nothing I create is going to "take off," and I don't need enterprise-level infrastructure. I tinker with projects that are fun to me. I’m not building e-commerce sites or anything similar.

Because of this, I often turned to providers offering a free tier and managing the infrastructure for me. Yes, I know RDS offers ~750 hours of usage, but most people prefer Aurora. Shout out to SST for solving this problem by abstracting away what the customer is getting – because most of the time, they don't care.

Does DynamoDB fit my needs? Sutre, but I may[ end up ] forcing myself to find a NoSQL schema that would fit.

Now, DSQL seems to have solved this. I’ve had three Aurora DSQL clusters running for the last three days, and I’m still at a $0 serverless budget (nice, right?). Plus, I can connect to it using Drizzle ORM, spin up a database and schema, and get a connection from Lambda in under 10 minutes.
