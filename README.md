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

## 更新日志

### 1.0.0

发布正式版本
