# Tasks

- (X) create landing page
- (X) signin / signup functionality
- (X) samples for landing page
- (X) play function
- (X) progress bar
- (X) gallery page
- (X) make gallery page sidepanel links functional
- (X) like / unlike functionality
- (X) your library page (return profile liked)
- (X) profile page (infos, delete account, return profile without liked)
- (X) remove useEffect api calls and use react-async
- (X) remove loading from state and use isPending from react-async
- (X) cache user / profile / stories
- (X) when toolbar is rendered make profile request for name and avatar
- (?) make profile and logout a dropdown
- (X) make emblem a gallery / landing link
- (X) error / loading / like / unlike / success / delete account handling and display
- (X) loading indicator
- (X) add title for pages

# Future patch

- story page
- search by name / author / genre
- filter by
- custom progress bar
- make sign in, sign up and profile into dialogs?
- details and text when clicking on a story (? only part of text with expand option. no expand option if not authenticated)
- author page
- grid and list view for your library page
- number of plays
- comments
- update avatar
- add description to stories
- add first name and last name
- update email
- update password
- forgot password
- remove likes from deleted accounts
- add custom styles (make pages full height, fix position for gallery sidepanel, progressbar and appbar, story avatar square, mobile friendly)

# Bugs

- no error handling for signin signup
- catch unwanted get to /auth when not logged in
- starting the app and user is authenticated Landing page will be shown, instead of gallery
- unlikeing a story in Your Library the story is not removed
- getting redirected to /gallery after refresh from any page (because of reauthenticating user, checking token before call might fix it)
- autoHideDuration from Alert not being reset when a new alert is rendered
- bottom scrollbar
