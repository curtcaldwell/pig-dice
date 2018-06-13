Actions [roll, hold]
Probability var [playerScore opponentScore playerTotalTurn]

|Behavior|input|output|
----------------------
|inital state|play button| a change in state|
----------------
|choice on roll| press roll btn| random num 1-6 is chosen|
-----------------
|choice on hold| press hold btn| adds total and passes turn|
---------------
|change to terminal state| score >= 100| congrats screen|
----------------
|add choice for one or two players| select one| changes to computer choice|
------------------
|easy computer player| rolls twice| hold after second roll, add total|
--------------------------
|hard computer player| rolls till 20 | hold after point achieved|
------------------------
