---
title: '[자바]LeetCode - Two Sum'
date: 2020-11-24 09:00:00 +0900
path: codingtest/20201124leetcode-two-sum'
---

## 문제

[LeetCode - Two Sum](https://leetcode.com/problems/two-sum/)

## 풀이

### 풀이 1

배열에 주어진 int 배열 nums에서 2개를 골라 더했을 때 target의 값을 가지는 숫자들의 index를 찾는 문제이다.

똑같은 숫자를 더하는 경우, 답이 여러개인 경우는 없다고 한다.

nums의 길이는 2 <= nums.length <= 10^3 으로 O(n^2)까지 구현해도 시간 복잡도는 크게 무리 없을 것 같다.

nums의 첫 번째 값부터 차례로 순회하면서 그 뒤에 존재하는 값들과 더해보며 target 값과 비교하며 답을 찾는다. 이와 같이 풀면 O(n!)의 시간 복잡도를 가지게 된다.

풀이 코드는 아래와 같다. (풀이 1)

### 풀이 2

풀이 1은 앞서 말한 바와 같이 O(n^2)의 복잡도를 가진다. 좀 더 최적화를 할 순 없을까?

Hash Table을 활용하면 보수를 O(1)의 시간에 찾을 수 있어 시간 복잡도를 낮출 수 있다.(기존에는 보수를 찾는 시간이 O(n)이었다.)

nums[]의 요소들을 Hash Table에 넣고 nums[] 배열을 선회하면서 보수 또한 Hash Table에 존재하는지 확인한다. 이 때 유의할 점은 찾은 보수와 현재 요소가 같지 않은지 확인해야 한다. nums[]를 2번 순회하여 답을 찾으므로 O(2n) = O(n)의 복잡도로 문제를 해결할 수 있다.

### 풀이 3

풀이 2의 경우는 nums[]를 2번 순회하면서 문제를 해결하는데, nums[]를 1번 순회하면서도 문제를 해결할 수 있다.

Hash Table에 값을 넣으면서 보수가 포함되어있는지 동시에 확인하면 된다. 이 경우 nums[]를 1번 순회하여 답을 찾으므로 O(n)의 복잡도로 문제를 해결할 수 있다.

## 코드
### 풀이 1
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

### 풀이 2
```java
import java.util.HashMap;
import java.util.Map;

class Solution {

  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numsMap = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      numsMap.put(nums[i], i);
    }
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (numsMap.containsKey(complement) && numsMap.get(complement) != i) {
        return new int[]{i, numsMap.get(complement)};
      }
    }
    throw new IllegalArgumentException("no solution");
  }
}
```

### 풀이 3
```java
import java.util.HashMap;
import java.util.Map;

class Solution {

  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numsMap = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (numsMap.containsKey(complement)) {
        return new int[]{i, numsMap.get(complement)};
      }
      numsMap.put(nums[i], i);
    }
    throw new IllegalArgumentException("no solution");
  }
}
```