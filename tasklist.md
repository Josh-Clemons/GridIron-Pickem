Stretch goals:
    [] update types (remove :any)
    [x] private leagues
    [x] in dashboard split leagues I own vs leagues I joined
    [x] league details accordion
        [x] update commissioner field
        [x] get user count
        [x] create access code based on encoded league id
            [x] add a 'click to copy' option
    [] league manager tools
        [x] make a new component, move rename/delete there. 
        [] change other user's picks
            - this will be done in "My Picks" (rename to just Picks), add a selector for LM to choose member
            [] add option to enable/disable league edit picks. Reflect in league details accordion
    [] error handle if get logged out of server
    [] limit options to teams not already picked
    [x] lock fields only after the corresponding game starts (or after the last game of the week starts)
    [] show scores on weekly pick page
    [] visually show what teams win/lose on weekly pick page
    [] accessability?
    [] make a big table that shows everyone's complete picks all at once
    [] setup max users
    [] somehow display team matchups and/or more team info to help player decide on a pick
    [] route to invite code instead of league id (this will stop people from guessing links to private leagues)

notes to self:
[x] why does it log me out now on refresh?
    - I am using store to see user, store refreshes and I didn't fetch user again

[x] exclude '' and null from same game pick check


