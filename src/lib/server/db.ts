import type { ReplyType } from "../types";

// place files you want to import through the `$lib` alias in this folder.

class Db {
    replies: ReplyType[] = [];

    add(reply: ReplyType) {
        this.replies.push(reply)
    }
    all() {
        return this.replies
    }
    
}

export const replies = new Db()
