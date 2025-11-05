const queries = {
getAllEntries:`
SELECT e.title,e.content,e.category,a.name, a.surname,a.email, a.image
FROM entries AS e
INNER JOIN authors AS a
ON e.id_author=a.id_author 
 `,
getEntriesbyEmail:`
    SELECT e.title,e.content,e.category,a.name, a.surname,a.email, a.image
    FROM entries AS e
	INNER JOIN authors AS a
    ON e.id_author=a.id_author
    WHERE a.email= $1
    ORDER BY e.title`,
editEntry:`
UPDATE entries
SET
title = $1,
content = $2,
category = $3
WHERE title= $4`,
deleteEntry:`
DELETE FROM entries
WHERE title= $1`
}

module.exports = queries;
