To complete base mode:
    [x] lock pick fields after the week has started
    [x] about page
    [x] rules
    [x] mui modal or sweet alert confirmations
    [x] styling
        [x] set theme
    [x] edit league name
    [x] comment code
    [x] update readme

Stretch goals:
    [] update types (remove :any)
    [] private leagues
    [] league manager tools
        [] make a new component, move rename/delete there. 
        [] change other user's picks
    [] error handle if get logged out of server
    [] limit options to teams not already picked
    [] lock fields only after the corresponding game starts (or after the last game of the week starts)
        [] limit options accordingly
            -- Thoughts on how to complete:
                [x] add game start time to data (also add gameId or similar to make sure there are not 2 from the same game)
                turn the team.list data file into a function that receives a week
                filter the gameData array to that week
                sort alphabetically by team name
                map over array to create options list
                lock fields if game start time is after now()
    [] show scores on weekly pick page
    [] visually show what teams win/lose on weekly pick page
    [] accessability?
    [] make a big table that shows everyone's complete picks all at once
    [] setup max users

notes to self:
[x] why does it log me out now on refresh?
    - I am using store to see user, store refreshes and I didn't fetch user again


