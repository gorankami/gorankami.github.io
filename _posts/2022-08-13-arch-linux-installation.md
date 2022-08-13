---
date: 2022-08-13
title: "Arch linux installation"
tags: arch linux dyi programming
category: diy
excerpt_separator: <!--more-->
description: "Installing Arch linux on an old Thinkpad"
published: false
---

I am installing Arch linux on an old Thinkpad just for the fact that it is hyped about for a long time and I have never tried it. I also want to move from ~250GB to ~500GB drive. My personal preference was always a debian based distribution, and for the past 5+ years I have been using Mint with xfce graphical interface.


# Important note

This is not a tutorial, I am not an linux expert. This is a "might be helpful for someone" log of my experience. You should be advised not to simply copy paste commmands before reading and understand the context.

<!--more-->

# Preparation

I downloaded arch `.iso` from `https://archlinux.org/download/` and I prepared an USB device to boot from, I just need to move the `.iso` to it.

Running `lsblk` in the terminal, I would see my devices and partitions listed: 

``` sh
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda      8:0    0 238,5G  0 disk 
├─sda1   8:1    0   512M  0 part /boot/efi
├─sda2   8:2    0     1K  0 part 
└─sda5   8:5    0   238G  0 part /
sdb      8:16   1  28,9G  0 disk 
└─sdb1   8:17   1  28,9G  0 part /media/covekzbrda/ESD-USB
```

From the list, I can see that `sda` is my Thinkpad hard drive with dedicated partitions for my mint installation. `sdb` is obviously the USB flash drive, seeing the mount point of partition `sdb1`.

> WARNING! I will be using `dd` for writing to an USB device, one of the most destructive tools because it's one letter away from clearing my mint installation drive.

Since I know that the usb drive is `sdb`, I will use it as the output for `dd`:

``` sh
sudo dd if=Downloads/archlinux-2022.08.05-x86_64.iso of=/dev/sdb status="progress"
```

I added `status="progress"` so I would see the progress log in the terminal, otherwise it would print a blank line until it finishes, which makes any superuser uneasy.

# Live boot and installation

I replaced my hard disk in the Thinkpad and live-booted arch from the USB drive.



