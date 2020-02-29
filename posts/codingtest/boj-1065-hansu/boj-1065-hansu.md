---
title: '[자바]백준 1065 한수'
date: 2020-02-05 08:26:28 -0400
path: 'codingtest/20200205boj_1065_hansu'
---

한 자리 수와 두자리 수는 무조건 한수임에 유의

```java
import java.io.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader bw = new BufferedReader(new InputStreamReader(System.in));
		String n = bw.readLine();
		char [] nums = n.toCharArray();
		int answer = 99;
		if(nums.length == 1) {
			System.out.print(n);
		}else if(nums.length == 2){
			System.out.print(n);
		}else {
			for(int i = 2; i < nums.length; i++) {
				int x = i == nums.length - 1? Integer.parseInt(n) + 1 : (int)Math.pow(10, i+1);
				for(int j = (int)Math.pow(10, i); j < x; j++) {
					char [] chars = Integer.toString(j).toCharArray();
					int d = chars[0] - chars[1];
					for(int k = 1; k < chars.length - 1; k++) {
						if(chars[k] - chars[k+1] != d) {
							break;
						} else if(k == chars.length - 2) {
							answer++;
						}
					}
				}
			}
			System.out.print(answer);
		}
	}
}
```
