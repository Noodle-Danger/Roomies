interface User {
  id: number;
  username: string;
  email: string;
  tokens: number;
  created_at: string;
}

interface UserPerk {
  id: number;
  user_id: number;
  perk_id: number;
  qty: number;
  purchased_at: string;
  perk_name: string;
}

interface Chore {
  id: number;
  task_name: string;
  tokens: number;
  user_id: number;
  is_complete: boolean;
  due_date: string | null;
  created_at: string;
}

interface CreateChoreData {
  user_id: number;
  task_name: string;
  tokens: number;
}

interface CompleteChoreData {
  user_id: number;
  chore_id: number;
}

interface Perk {
  id: number;
  perk_name: string;
  tokens: number;
  qty_initial: number;
  qty_remaining: number;
  created_at: string;
}

//! server response is an array. can it be single object?
interface CreatePerkData {
  perk_name: string;
  tokens: number;
  qty: number;
}
//! Does client have to send token info??
interface PurchasePerkData {
  perk_id: number;
  user_id: number;
  user_tokens: number;
  perk_tokens: number;
}

export type {
  User,
  UserPerk,
  Chore,
  CreateChoreData,
  CompleteChoreData,
  Perk,
  CreatePerkData,
  PurchasePerkData,
};

/* CHORE
{
    "id": 10,
    "task_name": "Mow lawn",
    "tokens": 10,
    "user_id": 2,
    "is_complete": false,
    "due_date": "2025-02-10T06:00:00.000Z",
    "created_at": "2025-01-28T06:00:00.000Z"
}
*/

/* PERK
{
    "id": 1,
    "perk_name": "Free Coffee",
    "tokens": 10,
    "qty_initial": 50,
    "qty_remaining": 45,
    "created_at": "2025-02-02T23:52:24.636Z"
}
*/
