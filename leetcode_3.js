/**
 * leetcode-3: 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 */

// 1. 暴力破解法：两层循环，以第i个字符为起点，每增加一个字符判断是否有重复字符，若有跳出此次循环。
function findLNRSubString(s) {
  if (s.length <= 1) {
    return s;
  }
  let start = 0; // 最长子串的起点
  let length = 0; // 最长子串的长度
  for (let i = 0; i < s.length; i++) {
    // 外层循环从0开始遍历
    if (s.length - i < length) {
      // 当已剩下的子串长度小于最长子串的长度，不需要再循环，可跳出循环
      break;
    }
    for (let j = i + 1; j < s.length; j++) {
      // 内层循环从i开始往后查找
      let char = s[j];
      let string = s.substr(i, j - i);
      if (string.indexOf(char) > -1) {
        // 若此时子串包含j字符，则比较最长长度和[i,j-1]的长度
        if (length < j - i) {
          start = i;
          length = j - i;
        }
        break;
      }
    }
  }
  return s.substr(start, length);
}
// 2.左右指针法。左右指针依次从0遍历，新建一个set结构保存不重复的字符。
// 右指针先右移，若set中没有右字符，则添加，并且右指针+1；
// 若set中有左指针依次右移直到set中不包含右字符，set中依次去除左字符
// 过程中判断最大长度和当前左右字符之间的长度
function findLNRSubString1(s) {
  if (s.length < 2) {
    return s;
  }
  let left = 0;
  let right = 0;
  let length = s.length;
  let set = new Set();
  let number = 0;
  let start = 0;
  while (left < length && right < length) {
    if (set.has(s[right])) {
      set.delete(s[left++]);
    } else {
      set.add(s[right++]);
    }
    if (set.size > number) {
      number = set.size;
      start = left;
    }
  }
  return s.substr(start, number);
}

let s = "fasljfldsjalfewrewq";
let result = findLNRSubString(s);
let result1 = findLNRSubString1(s);
console.log(result, result1);
