README
This README would normally document whatever steps are necessary to get your application up and running.

What is this repository for?
Quick summary 

Not done much,just basics

Version 
Version : 0.0.1
Learn Markdown
How do I get set up?
Summary of set up git in bitbucket

                        steps
==============================================================================
1.clone
2.navigate to http://localhost:3000 from browser
3.run npm install from terminal
4.create users by form[username will be the key to login]
5.for any oneof your users, set role=admin in mongo by using following command on mongo
6.db.users.update({ _id: ObjectId("5bf67a36cd5db95734f1ed43") },{$set: { "role": "admin" }})

