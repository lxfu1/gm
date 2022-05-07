# gm

Git 快捷操作工具，类似 alias。

## 安装

```sh
$ npm i -g @lxfu/gm
```

## 使用

- `gm --version` : 查看版本信息
- `gm l`: 查看本地所有分支
  - `gm l -r` : 查看远程分支
  - `gm l -a` : 查看所有分支
- `gm d branchName` : 删除指定分支
- `gm D branchName1 branchName2` : 删除指定分支(branchName1, branchNameX)和当前分支以外的所有分支
- `gm a` : 暂存
  - `gm a`: 相当于 `git add .`
  - `gm a file`: 相当于 `git add file`
- `gm cm commitInfo` : 相当于 `git commit -m commitInfo`
- `gm r commitId` : 相当于 `git reset commitId`
- `gm p` : 相当于 `git push`
- `gm pr` : 用于没有远程分支的提交
  - `gm pr` : 相当于 `git push origin HEAD`
  - `gm pr branch` : 相当于 `git push --set-upstream origin branch`
- `gm pl` : 相当于 `git pull`
- `gm co` : 相当于 `git checkout`
- `gm cb branch` : 相当于 `git checkout -b branch`

## 更新日志

### 1.0.1

新增 `a cm r p pr pl co cb` 命令
### 1.0.0

发布正式版本
