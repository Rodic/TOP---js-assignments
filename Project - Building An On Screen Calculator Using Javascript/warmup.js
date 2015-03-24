function my_max(nums) {
    max = nums[0];
    for (var i = 0; i < nums.length; i++) {
	if (nums[i] > max) max = nums[i];
    }
    return max;
}

console.log(my_max([1, 5, 3, 2]))


function vowel_count(string) {
    count = 0;
    for(var i = 0; i < string.length; i++) {
	if ("aeiouy".search(string[i]) >= 0) {
	    count += 1;
	}
    }
    return count;
}

console.log(vowel_count("banana"));


function reverse(string) {
    result = "";
    for(var i = 0; i < string.length; i++) {
	result = string[i] + result;
    }
    return result;
}

console.log(reverse("banana"));
