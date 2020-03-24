---
title: '[자바]백준 2108 통계학'
date: 2020-03-24 09:00:00 +0900
path: 'codingtest/20200324boj_2108_statistics'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int [] nums = new int [8001];
		for(int i = 0; i < n; i++) {
			nums[Integer.parseInt(br.readLine()) + 4000]++;
		}
		int sum = 0;
		int min = Integer.MAX_VALUE;
		int max = 0;
		int count = 0;
		int medianValue = 0;
		int mode = 0;
		int modeFrequency = 0;
		int sameModes = 0;
		boolean isMean = true;
		boolean isCenter = true;

		for(int i = 0; i < 8001; i++) {
			if(nums[i] != 0) {
				sum += nums[i] * (i - 4000);
				count += nums[i];
				max = i - 4000;
				if(nums[i] > modeFrequency) {
					mode = i - 4000;
					modeFrequency = nums[i];
					sameModes = 0;
				}else if(nums[i] == modeFrequency && sameModes < 1) {
					mode = i - 4000;
					sameModes++;
				}
				if(isMean) {
					min = i - 4000;

					isMean = false;
				}
				if(isCenter && count >= n / 2 + 1) {
					medianValue = i - 4000;
					isCenter = false;
				}
			}
		}
		System.out.println(Math.round(((double)sum) / n));
		System.out.println(medianValue);
		System.out.println(mode);
		System.out.println(max - min);
	}
}
```
