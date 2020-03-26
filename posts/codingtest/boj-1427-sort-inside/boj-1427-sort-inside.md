---
title: '[자바]백준 1427 소트인사이드'
date: 2020-03-26 09:00:00 +0900
path: 'codingtest/20200326boj_1427_sort_inside'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String n = br.readLine();
		ArrayList<Integer> nums = new ArrayList<Integer>();
		for(int i = 0; i < n.length(); i++) {
			nums.add((int)n.charAt(i) - 48);
		}
		Collections.sort(nums, Collections.reverseOrder());
		for(int i = 0; i < nums.size(); i++) {
			System.out.print(nums.get(i));
		}
	}
}
```
