---
title:  "Ubuntu下常见问题记录"
date:   2017-05-07
---

### Q001: [Error] sudo apt-get install xxx

**Description**

```shell
E: Could not get lock /var/lib/dpkg/lock - open (11:Resource temporarily unavaliable)
E: Unable to lock the administration directory (/var/lib/dpkg/), is another process using it? 
```
 
**Solution**

```shell
sudo rm /var/cache/apt/archives/lock
sudo rm /var/lib/dpgk/lock
```

### Q002: [Error] ping: unknown host xx.xx.xx.xx

**Description**

```shell
ping www.baidu.com
=> ping: unknown host www.baidu.com
```

**Solution**

1. 首先ping一下ip地址，譬如`ping 8.8.8.8`，如果可以ping通的话转2，否则转3；
2. 转到此处说明是DNS解析问题，可以查看配置文件`/etc/resolv.conf`，可以通过`nameserver xx.xx.xx.xx`的方式添加DNS服务器；
3. 转到此处说明是网络配置问题，首先查看是否有内网地址，如果没有的话首先配置ip地址，否则直接进行默认网关的配置。

```shell
# ip地址的配置 (以192.168.1.1/24为例)
sudo ifconfig eth0 192.168.1.202/24

# 默认网关的配置
sudo route add default gw 192.168.1.1
```
