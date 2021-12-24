1. 每次创建新分支推送提示：
The current branch xxx has no upstream branch, use
git push --set-upstream origin sisi/location
[reason]  
  - 本地分支没有对应关联的远端分支  

[concept]  
  upstream branch 上游分支  
  Upstream branches define the branch tracked on the remote repository by your local remote branch   
  (also called the remote tracking branch)  
 
[resolve] Set upstream branch   
 - 设置分支追踪指定远端分支  
  1. using git push  
    git push -u <remote> <branch> / git push --set-upstream <remote> <branch>  
  2. using a git alias -- C:\Program Files\Git\etc\profile.d  aliases.sh
    a. git config --global alias.pushd "push -u origin HEAD"
    b. $ alias gp='git push -u origin HEAD'
 - Set tracking branches: link local branch to remote tracking branches
  1. for new local branches
    git checkout --track origin/dev 
    - Branch 'dev' set up to track remote branch 'dev' from 'origin'.
      Switched to a new branch 'dev'
  2. for existing local branches
    git checkout -b feature
    - Switched to a new branch 'feature'
    git branch -u origin/feature

[useful]
  - automatically knows that it has to fetch the new commits to the remote tracking branch 自动追踪
  - get references to your remote repositories
  - perform pull and push easily
  When performing a “git fetch” command, you can bring the new commits from your remote repository and you can choose to merge them at will.

[related]
  - git branch --unset-upstream 取消追踪远端分支
  - check tracking branches: git branch -vv
  [Why do I need to do `--set-upstream` all the time?](https://stackoverflow.com/questions/6089294/why-do-i-need-to-do-set-upstream-all-the-time)  
  git config --global push.default current  
  git config --global branch.autosetupmerge always     

2. 基于某分支开新分支  
git checkout -b test origin/develop  基于远端develop开test分支
git checkout -b test 基于当前分支开test分支


3. 一些设置   
git config --global credential.helper store  记住git账户密码
git config --global core.ignorecase false  大小写敏感 。

4. HEAD  
  1. refers to the current commit of branch you are viewing
  2. find out: cat .git/HEAD

5. 撤销提交  
  从本地仓库回到工作区：workspace-Index-Resposity-Remote
  1. 清除改动(重置Resposity或者Index) 
    某个文件 git reset HEAD <file>   -> current HEAD中重置某文件
    所有文件 git reset --hard HEAD/HEAD^/commitId  -> 
  2. 回到暂存区->回到工作区   
     a. git reset --soft HEAD^ -> git restore --staged <file>   
     b. soft 撤销commit，不撤销git add .，不删除工作区     
        ![avatar](/images/reset-soft.png)  
        mixed 撤销commit，撤销git add . ，不删除工作区  
        ![avatar](/images/reset-mixed.png)  
        hard 撤销commit，撤销git add . ，删除工作区  
        ![avatar](/images/reset-hard.png)  
  3. 取消工作区改动 git checkout ./<file>
  4. 修改commit message: git commit --amend



6. 一些有用的指令  
  1. git reflog  
  查看所有分支的所有操作记录（包括reset操作后被删除的commit）  
  2. git rm 删除文件  
      git rm -r 删除文件夹  
      git mv old  new 重命名  
      git revert 5[commitID]...1[commitID]  不包含1   5-4-3-2 依次回退， 依次产生多个Revert "msg"  
      git revert -n 5[commitID]...1[commitID]  依次回退，does not make the commits msg  
  3. 获取当前分支名
      git name-rev --name-only HEAD  
      git rev-parse --abbrev-ref HEAD  
      git symbolic-ref --short HEAD  
 
