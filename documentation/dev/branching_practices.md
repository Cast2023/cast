**Checkout technics:**  
* `git checkout -b <branch> <remote branch>`= `git branch <branch> <remote branch>` + `git checkout <branch branch>`. Create `<branch>` then move the `HEAD` pointer to there.
* `git checkout --track <remote branch>` Creates a new branch from the specified branch. Moves HEAD to the new branch. The new branch is set to track the remote branch. 

**Make local `BRANCH_NAME` branch updated from the remote**  
* `git checkout BRANCH_NAME`  
* `git fetch origin`  
* `git merge origin/BRANCH_NAME`  
(or)  
* `git checkout BRANCH_NAME`  
* `git pull origin BRANCH_NAME`  

[Useful to read](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)

  ## Git workflow 1
* Add a new remote repository to a local repo 
  * `git remote add  CERTAIN_LINK`  
* When you are merging, you might have to use `--allow-unrelated-histories` flag  
  * `git fetch origin`  
  * `git merge origin/master`  

* Create a new branch `feature/create-awesome` from the master branch  
  * `git checkout -b feature/create-awesome master`  
* In branch `feature/create-awesome` start work work work....
* Commit changes
* Push your changes to `feature/create-awesome`  
  If you have problems with push. These codes may help.  
  * `git push origin feature/create-awesome:feature/create-awesome`  
    or  
  * ` git push -u origin HEAD`  
    or  
  * `git push --set-upstream origin feature/create-awesome`  
  * `git push origin HEAD`

  ## Git workflow 2
* `git pull origin master`
* `git checkout -b branch-name-here`
* _work work work work_
* `git add -a /-p`
* `git commit -m "Commit message"`
* Push
  * Ready for sharing to team:
    * share/save your `feature/dev/personal` -branch
    * `git push ?? ??`
  * Ready for staging:
    * `git checkout master`
    * `git pull`
    * `git merge branch-name-here`
    * `git push ?? ??`
  * Ready for production:
    * _todo_

  ## Git workflow 3. When we made changes from 'feature1' branch, and want changes to a new 'feature2' branch, which does not exist yet. 
* `git checkout -b feature2 feature1`
* `git status`
* `git add -a /-p`
* `git commit -m "Commit message"`
* `git push origin feature2`
    
