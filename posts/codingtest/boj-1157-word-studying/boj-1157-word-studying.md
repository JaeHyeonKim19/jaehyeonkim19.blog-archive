---
title: '백준 1157 단어 공부'
date: 2020-01-10 08:26:28 -0400
path: 'codingtest/20200110boj_1157_word_studying'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String str = sc.next();
		int [] counts = new int[26];
		for(int i = 0;i<str.length();i++) {
			int alphabet = (int)str.charAt(i);
			for(int j = 97;j<=122;j++) {
				if(alphabet == j || alphabet == j-32) {
					counts[j-97] += 1;
					break;
				}
			}
		}
		int index = 0;
		boolean isMultiple = false;
		for(int i = 1;i<counts.length;i++) {
			if(counts[i]>counts[index]) {
				index = i;
				isMultiple = false;
			} else if(counts[i] == counts[index]) {
				isMultiple = true;
			}
		}
		if(isMultiple) {
			System.out.print("?");
		}else {
			System.out.println((char)(index+65));
		}
	}
}
```
