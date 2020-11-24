---
title: '[자바]LeetCode - Two Sum'
date: 2020-11-24 09:00:00 +0900
path: codingtest/20201124leetcode-two-sum'
---

## 문제

[LeetCode - Two Sum](https://leetcode.com/problems/two-sum/)

## 풀이

배열에 주어진 int 배열 nums에서 2개를 골라 더했을 때 target의 값을 가지는 숫자들의 index를 찾는 문제이다.

똑같은 숫자를 더하는 경우, 답이 여러개인 경우는 없다고 한다.

nums의 길이는 2 <= nums.length <= 10^3 으로 O(n^2)까지 구현해도 시간 복잡도는 크게 무리 없을 것 같다.

nums의 첫 번째 값부터 차례로 순회하면서 그 뒤에 존재하는 값들과 더해보며 target 값과 비교하며 답을 찾는다. 이와 같이 풀면 O(n!)의 시간 복잡도를 가지게 된다.

풀이 코드는 아래와 같다.

## 코드

```java
class Solution {

  public int[] twoSum(int[] nums, int target) {
    int[] indices = new int[2];

    for(int i = 0; i < nums.length - 1; i++) {
      for(int j = i + 1; j < nums.length; j++) {
        if(nums[i] + nums[j] == target) {
          indices[0] = i;
          indices[1] = j;
          return indices;
        }
      }
    }
    
    return indices;
  }
}
```
