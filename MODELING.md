# Schema Design — Personal Productivity Hub

> Fill in every section below. Keep answers concise.

---

## 1. Collections Overview

Briefly describe each collection (1–2 sentences each):

- **users** — user create projects
- **projects** —projects have tasks 
- **tasks** —taks have notes 
- **notes** —notes can be optional

---

## 2. Document Shapes

For each collection, write the document shape (field name + type + required/optional):

### users
```
{
  _id: ObjectId,
  email: string (required, unique),
  passwordHash: string (required),
  name: string (required),
  createdAt: Date (required)
}
```

### projects
```
TODO

{
  _id: ObjectId,
  userId: ObjectId (required),   
  name: string (required),
  description: string (optional),
  isArchived: boolean (required),
  createdAt: Date (required)
}
```

### tasks
```
TODO

{
  _id: ObjectId,
  projectId: ObjectId (required),   
  title: string (required),
  description: string (optional),
  status: string (required),   
  priority: number (optional),
  tags: [string] (optional),
  subtasks: [
    {
      title: string,
      done: boolean
    }
  ],
  createdAt: Date (required)
}
```

### notes
```
TODO
{
  _id: ObjectId,
  userId: ObjectId (required),
  projectId: ObjectId (optional),   // may or may not belong to a project
  content: string (required),
  tags: [string] (optional),
  createdAt: Date (required)
}
```

---

## 3. Embed vs Reference — Decisions

For each relationship, state whether you embedded or referenced, and **why** (one sentence):

| Relationship                       | Embed or Reference? | Why? |
|-----------------------------------|---------------------|------|
| Subtasks inside a task            |         embeded  |   because subtasks are inside the tasks    |
| Tags on a task                    |       embeded    | Bcz tags  are simple string meaninful only fo realated table so srtoring in table is effiecient |
| Project → Task ownership          |      Reference   | Bcz project can have many tasks and tasks can be scalable so storing refernce is good      |
| Note → optional Project link      |      Referenc    |Bcz note can exsist without a project  so referncing keep it safe from duplication      |

---

## 4. Schema Flexibility Example

Name one field that exists on **some** documents but not **all** in the same collection. Explain why this is acceptable (or even useful) in MongoDB.

> _Your answer here._4. Schema Flexibility Example

One example is projectId in notes.

Some notes have projectId, but some don’t.

This is fine in MongoDB because it does not require all documents to have same fields. It is useful because we can store both project-related notes and general notes in the same collection.
