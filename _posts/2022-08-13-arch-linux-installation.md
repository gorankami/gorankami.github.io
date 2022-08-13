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



NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0   680M  1 loop /run/archiso/airootfs
sda      8:0    0 447.1G  0 disk 
├─sda1   8:1    0   579M  0 part 
└─sda2   8:2    0 446.6G  0 part 
sdb      8:16   1  14.7G  0 disk 
├─sdb1   8:17   1   773M  0 part /run/archiso/bootmnt
└─sdb2   8:18   1    13M  0 part 


fdisk /dev/sda



It asks you to input commands (typing `m` will give you a list of commands). I should note that changes to the hard disk will not happen until you explicitly use command `w`. So all I will be doing as I create partitions is add up a stack of commands that the tool will apply at the very end. 

First I had to delete partitions, I had two of them, so I had to type `d` twice, the first time I was prompted for which partition do I want to delete, I typed `1`, second time there was no prompt.

Printing with `p` gives me no partitions, so now I need to create them. I am planning to create four of them:

1. Boot +200M - Holding the grubmenu
2. Swap +12G - Swap memory
3. Root +25G - Place for system and applications
4. Home (default) - Space for user data

For creating each of the partitions, I used the command `n`, used `primary` option typing `p`, using default setting for first sector, and using the size from the list above for the last sector (for example, typing `+200M` for 200 megabytes).

When asked to remove filesystem signature, I typed `Y` to confirm. 

Once I was done, i typed `w` and partitions were quickly created and I am back to the terminal input. My new device partition structure was (typing `lsblk`):


NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0   680M  1 loop /run/archiso/airootfs
sda      8:0    0 447.1G  0 disk 
├─sda1   8:1    0   200M  0 part 
├─sda2   8:2    0    12G  0 part 
├─sda3   8:3    0    25G  0 part 
└─sda4   8:4    0 409.9G  0 part 
sdb      8:16   1  14.7G  0 disk 
├─sdb1   8:17   1   773M  0 part /run/archiso/bootmnt
└─sdb2   8:18   1    13M  0 part 

Now, partitions should have filesystems on them. I am using command `mkfs.ext4` to create ext4 filesystems for boot, root and home partitions, so commands are as follows:

``` sh
mkfs.ext4 /dev/sda1
mkfs.ext4 /dev/sda3
mkfs.ext4 /dev/sda4
```

For the swap partition, I used this command:

``` sh
mkswap /dev/sda2
swapon /dev/sda2
```

To install bootloader and arch to the hard disk, I should mount all the partitions in correct places.

First mounting would be the root partition:

``` sh
mount /dev/sda3 /mnt
```

Once mounted, I created two directories for mounting boot and home:

``` sh
mkdir /mnt/home
mkdir /mnt/boot

mount /dev/sda1 /mnt/boot
mount /dev/sda2 /mnt/home
```

You can check mount points by listing devices with `lsblk`.

``` sh
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0    7:0    0   680M  1 loop /run/archiso/airootfs
sda      8:0    0 447.1G  0 disk 
├─sda1   8:1    0   200M  0 part /mnt/boot
├─sda2   8:2    0    12G  0 part [SWAP]
├─sda3   8:3    0    25G  0 part /mnt
└─sda4   8:4    0 409.9G  0 part /mnt/home
sdb      8:16   1  14.7G  0 disk 
├─sdb1   8:17   1   773M  0 part /run/archiso/bootmnt
└─sdb2   8:18   1    13M  0 part 
```

The next command is the installation of archlinux using `pacstrap`. I am using `base` and `base-devel` for basic sets of packages, but you could append individual packages, I wanted to have `nano` installed, for example. I made sure my network cable was plugged in.

``` sh
pacstrap /mnt base base-devel nano
```

I generated fstab file for partitions: 

``` sh
genfstab -U /mnt >> /mnt/etc/fstab
```

Next, I switched my root to use the context of the new arch installation: 

``` sh
arch-chroot /mnt
```

I need a network manager, install and activate it:

``` sh
pacman -S networkmanager
systemctl enable NetworkManager
```

For booting up, I have to install `grub`, and then install specific grub platform:

``` sh
pacman -S grub
grub-install --target=i386-pc /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

I added a password for my root with `passwd`. 

For setting up locale, i edited '/etc/locale.gen'. I uncommented the en_US and sr_RS (Serbian) locales.

``` sh
en_US.UTF-8 UTF-8  
en_US ISO-8859-1  
sr_RS UTF-8  
sr_RS@latin UTF-8  
```

I applied command `locale-gen` to generate locales based on uncommented settings. I also set the default language in `/etc/locale.conf` (new file), adding:

``` sh
LANG=en-US.UTF8
```

Setting the local time zone, I linked Belgrade to `/etc/localtime`

``` sh
ln -sf /usr/share/zoneinfo/Europe/Belgrade /etc/localtime
```

Last thing I did is naming my computer for the network by editing `/etc/hostname` and adding `x230` in my case (It's the thinkpad model)

