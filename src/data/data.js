// history | grep cp
// echo 'history | grep cp' >> data/data.txt

const cardGitList = {
  "Rewrite history": [
    "git rebase -i HEAD~n",
    "git add path/to/filename",
    "git commit -m 'Commit comment phrase'",
    "git commit --amend --no-edit",
  ],

  "Undo n commits": ["git reset [--hard | --mixed | --soft] HEAD~n"],
  "Log commits": [
    "git log --oneline -- src/path/filename.js",
    "git log --oneline -n 8",
    "git log --oneline -n 50 --all --graph --decorate",
    "git log  --pretty=oneline | tail -n 10",
  ],
  "Push commits": [
    "git push origin master~n:master",
    "git push origin master",
    "git push --force origin master",
  ],
  "Remove a file from repository": [
    "git rm filename.ext",
    "git rm --cached filename.ext",
  ],
  "Stash working files": [
    "git stash",
    "git stash -u, --include-untracked",
    "git stash save 'message'",
    "git stash list",
    "git stash apply",
    "git stash apply stash@{n}",
    "git stash apply n",
    "git stash pop",
    "git stash pop stash@{n}",
    "git stash show",
    "git stash show -p stash@{1}",
    "git stash show -p",
    "git stash show -p 1",
    "git stash branch branch-name stash@{n}",
    "git stash drop stash@{n}",
    "git stash -a, --all",
    "git stash clear",
  ],
  "Rename actual branch": ["git branch -m new-branch-name"],
  "Reset a commit destructive rebase interactive": [
    "git reflog show extract-card-list-to-a-function",
    "git reset extract-card-list-to-a-function@{1}",
  ],
  "Relocating a branch": [
    "git rebase <base>",
    "git rebase <base> <other_branch>",
  ],
  "Log n commits and all branch graphically": [
    "git log --oneline -n 12 --all --graph --decorate",
  ],
  "Merge a branch on actual branch": [
    "git checkout master",
    "git pull origin master",
    "git merge test",
    "git push origin master",
  ],
  "Compare a file in the current branch with one in another branch": [
    "git diff <other_branch> -- <file_path>",
  ],
};

const cardBashList = {
  "Make a directory": ["mkdir directory-name"],
  "Change name to a directory": ["mv old-directory-name new-directory-name"],
  "Remove an empty directory": ["rm -d bonjour"],
  "Remove a non empty directory": ["rm -dr bonjour"],
  "Install .deb files in the command line": [
    "sudo apt install path_to_deb_file",
    "sudo apt install gdebi",
    "sudo apt list --installed | grep chat",
    "dpkg -l | grep chat",
  ],
  "Unninstall .deb files in the command line": [
    "sudo apt remove program_name",
    "sudo apt list --installed | grep chat",
    "dpkg -l | grep chat",
    "dpkg -r program_name",
  ],
  "Print in bash terminal": ['echo "Hola mundo"'],
  "Display the contents of a text file": ["cat filename", "less filename"],
};

// Insert the following line into the file that imports this file:
// import { cardGitList, cardBashList } from "./data/data";

export { cardGitList, cardBashList };
