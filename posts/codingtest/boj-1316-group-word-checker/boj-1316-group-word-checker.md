---
title: '백준 1316 그룹 단어 체커'
date: 2020-01-10 08:26:28 -0400
path: 'codingtest/20200110boj_1316_group_word_checker'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int count = sc.nextInt();
		int answer = 0;
		char currentChar = 'a';
		String word = "";
		ArrayList<Character> history = new ArrayList<Character>();
		for(int i = 0;i<count;i++) {
			word = sc.next();
			for(int j = 0;j<word.length();j++) {
				currentChar = word.charAt(j);
				if(j>0 && currentChar != word.charAt(j-1) && history.contains(currentChar)) {
					break;
				}
				history.add(currentChar);
				if(j == word.length()-1) answer++;
			}
			history.clear();
		}
		System.out.print(answer);
	}
}
```
