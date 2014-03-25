require! \fs
error, secret <- fs.read-file \secret
throw error if error
secret .= to-string \utf-8 .replace /\n.*/, ''
firebase = new (require \firebase) 'https://askkkkk.firebaseio.com/'
  ..auth secret, (error) ->
    throw error if error

{keys, unique} = require 'prelude-ls'

snapshot <- firebase.child "candidates" .once \value
for cid, c of snapshot.val!
  firebase.child "candidates/#{cid}/addressed_count" .set 0
  firebase.child "candidates/#{cid}/replied_count" .set 0

snapshot <- firebase.child "questions" .on \child_added
return unless snapshot.val!.state and snapshot.val!.state.passed
for id in keys snapshot.val!.addressing
  firebase.child "candidates/#{id}/addressed_count" .transaction -> it + 1

return unless snapshot.val!.responses_count > 0
for responser in unique [ res.responser for id, res of snapshot.val!.responses ]
  firebase.child "candidates/#{responser}/replied_count" .transaction -> it + 1
