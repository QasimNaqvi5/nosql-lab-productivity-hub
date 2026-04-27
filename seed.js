// seed.js
// =============================================================================
//  Seed the database with realistic test data.
//  Run with: npm run seed
//
//  Required minimum:
//    - 2 users
//    - 4 projects (split across the users)
//    - 5 tasks (with embedded subtasks and tags arrays)
//    - 5 notes (some attached to projects, some standalone)
//
//  Use the bcrypt module to hash passwords before inserting users.
//  Use ObjectId references for relationships (projectId, ownerId).
// =============================================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connect } = require('./db/connection');

(async () => {
  const db = await connect();

  // OPTIONAL: clear existing data so re-seeding is idempotent
  // await db.collection('users').deleteMany({});
  // await db.collection('projects').deleteMany({});
  // await db.collection('tasks').deleteMany({});
  // await db.collection('notes').deleteMany({});

  // =============================================================================
  //  TODO: Insert your seed data below.
  //
  //  Hints:
  //    - Hash passwords:   const hash = await bcrypt.hash('password123', 10);
  //    - Capture inserted ids:
  //        const u = await db.collection('users').insertOne({ ... });
  //        const userId = u.insertedId;
  //    - Use those ids when inserting projects/tasks/notes.
  //    - Demonstrate schema flexibility: include at least one optional field
  //      on SOME documents but not all (e.g. dueDate on some tasks only).
  //
  //  Sample task shape:
  //    {
  //      ownerId: <ObjectId>,
  //      projectId: <ObjectId>,
  //      title: "Write report introduction",
  //      status: "todo",
  //      priority: 3,
  //      tags: ["writing", "urgent"],
  //      subtasks: [
  //        { title: "Outline sections", done: true },
  //        { title: "Draft", done: false }
  //      ],
  //      createdAt: new Date()
  //    }
  // =============================================================================




  // USERS

  const USR1Hash = await bcrypt.hash('password123', 10);
  const USR2Hash = await bcrypt.hash('mypassword', 10);

  const u1 = await db.collection('users').insertOne({
    name: 'Ali Khan',
    email: 'ali@exp.com',
    password: USR1Hash,
    createdAt: new Date()
  });

  const u2 = await db.collection('users').insertOne({
    name: 'Sara Ahmed',
    email: 'sara@exp.com',
    password: USR2Hash,
    createdAt: new Date()
  });

  const USR1Id = u1.insertedId;
  const USR2Id = u2.insertedId;

  // PROJECTS

  const p1 = await db.collection('projects').insertOne({
    name: 'Personal Website',
    description: 'My simple portfolio site',
    ownerId: USR1Id,
    createdAt: new Date()
  });

  const p2 = await db.collection('projects').insertOne({
    name: 'School Assignment',
    description: 'BETTER THEN ADBMS ASSIGNMENTS ',
    ownerId: USR1Id,
    createdAt: new Date()
  });

  const p3 = await db.collection('projects').insertOne({
    name: 'Grocery App',
    description: 'AALO LELO GOBI LELO PIAZ TAMATAR ADRAK SAB LELO',
    ownerId: USR2Id,
    createdAt: new Date()
  });

  const p4 = await db.collection('projects').insertOne({
    name: 'Blogs Project',
    description: 'COME AND READ MY PROJECT',
    ownerId: USR2Id,
    createdAt: new Date()
  });

  const P1ID = p1.insertedId;
  const P2ID = p2.insertedId;
  const P3ID = p3.insertedId;
  const P4ID = p4.insertedId;

  // TASKS

  await db.collection('tasks').insertMany([
    {
      ownerId: USR1Id,
      projectId: P1ID,
      title: 'Create homepage layout',
      status: 'todo',
      priority: 2,
      tags: ['frontend'],
      subtasks: [
        { title: 'Add header', done: true },
        { title: 'Add footer', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: USR1Id,
      projectId: P2ID,
      title: 'Write report',
      status: 'in-progress',
      priority: 3,
      tags: ['writing'],
      subtasks: [
        { title: 'Collect data', done: true },
        { title: 'Write intro', done: false }
      ],
      dueDate: new Date('2026-05-01'),
      createdAt: new Date()
    },
    {
      ownerId: USR2Id,
      projectId: P3ID,
      title: 'Design app UI',
      status: 'todo',
      priority: 1,
      tags: ['design'],
      subtasks: [
        { title: 'Wireframe', done: false }
      ],
      createdAt: new Date()
    },
    {
      ownerId: USR2Id,
      projectId: P4ID,
      title: 'Setup database',
      status: 'done',
      priority: 2,
      tags: ['backend'],
      subtasks: [
        { title: 'Create collections', done: true },
        { title: 'Connect MongoDB', done: true }
      ],
      createdAt: new Date()
    },
    {
      ownerId: USR1Id,
      projectId: P1ID,
      title: 'Fix navbar bug',
      status: 'todo',
      priority: 3,
      tags: ['bugfix'],
      subtasks: [
        { title: 'Find issue', done: false }
      ],
      createdAt: new Date()
    }
  ]);

  // NOTES
  

  await db.collection('notes').insertMany([
    {
      title: 'Ideas for homepage',
      content: 'HERO SECTION WITH IMAGE',
      projectId: P1ID,
      createdAt: new Date()
    },
    {
      title: 'Meeting notes',
      content: 'Discussed DEADLINE WITH TEAMS ',
      createdAt: new Date()
    },
    {
      title: 'Assignment tips',
      content: 'CONSULT TA,s it is good',
      projectId: P2ID,
      createdAt: new Date()
    },
    {
      title: 'Random thought',
      content: 'ADBMS IS VERY VERY DIFFICULT',
      createdAt: new Date()
    },
    {
      title: 'COURSE IMPROVEMENTS',
      content: ' NUMBER OF CLASSES SHOULD REDUCE TO 0 INSTEAD OF  2 IN A WEEK',
      projectId: P3ID,
      createdAt: new Date()
    }
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);

})();
