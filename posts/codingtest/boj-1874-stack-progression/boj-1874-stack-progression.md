---
title: '[자바]백준 1874 스택 수열'
date: 2020-01-23 08:26:28 -0400
path: 'codingtest/20200123boj_1874_stack_progression'
---

```java
import java.io.*;
import java.util.Stack;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		int n = Integer.parseInt(bf.readLine());
		Stack<Integer> st = new Stack<Integer>();
		int [] nums = new int [n];
		for(int i = 0;i < n;i++) {
			nums[i] = Integer.parseInt(bf.readLine());
		}
		int index = 0;
		int i = 1;
		while(index < n) {
			if(!st.empty() && st.peek() != nums[index]) {
				if(i > n) {
					System.out.print("NO");
					return;
				}
				st.push(i++);
				sb.append("+\n");
				continue;
			}else if(!st.empty() && st.peek() == nums[index]) {
				st.pop();
				sb.append("-\n");
				index++;
				continue;
			}
			st.push(i++);
			sb.append("+\n");
		}
		System.out.print(sb.toString());
	}
}
```
