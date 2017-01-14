# Firelist

This is a project I'm working on to learn Angular2 and Firebase.  It's mostly a todo list right now, but the neat thing with Firebase is its automatic updating of the UI when the database changes.  Eventually I'm going to add list sharing with other users.  The database has been designed to support this (I think).

It's running at http://firelist.cokert.com.  Feel free to poke at it.  I currently don't have a mechanism for removing items or lists, but that's coming (hopefully soon...)

## Database Structure
The root has two nodes:
- `lists`
- `users`

The `lists` node is an array of all lists in the system.  The `users` node has a `lists` array that contains all the lists to which a user has access.  Sharing is then as simple as adding a list's key to a user's list array.

## Roadmap?

As stated, I eventually want to implement list sharing.  Oh, and list management so you can delete lists and items (or maybe archive them, too, which would give you the ability to restore archived items). I also plan to eventually expand on what a list item is.  I want to add other properties to it at a minimum, maybe make items polymorph into all kinds of things.  Idunno.  This is all assuming I don't get bored with this or busy with other things, of course.
