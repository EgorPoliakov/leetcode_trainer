import json

f = open('leetcode-anki/questions.json')
data = json.load(f)

filter_list = []
binary_search_list = []
binary_tree_list = []
dynamic_programming_list = []
graph_list = []
sliding_window_list = []

for i in data:
    if(int(i["likes"])/(int(i["dislikes"])+int(i["likes"])) > 0.7 and i["is_premium"] == "no"):
        print(int(i["likes"])/(int(i["dislikes"])+int(i["likes"])))
        filter_list.append(i)
        if("binary-search" in i["tags"]):
            binary_search_list.append(i)
        if("binary-tree" in i["tags"]):
            binary_tree_list.append(i)
        if("dynamic_programming" in i["tags"]):
            dynamic_programming_list.append(i)
        if("graph" in i["tags"]):
            graph_list.append(i)
        if("sliding_window" in i["tags"]):
            sliding_window_list.append(i)                    
f.close()

with open('questions/filter_likes_premium.json', 'w') as fout:
    json.dump(filter_list, fout)    
with open('questions/binary_search_questions.json', 'w') as fout:
    json.dump(binary_search_list, fout)
with open('questions/binary_tree_questions.json', 'w') as fout:
    json.dump(binary_tree_list, fout)
with open('questions/dynamic_programming_questions.json', 'w') as fout:
    json.dump(dynamic_programming_list, fout)
with open('questions/graph_questions.json', 'w') as fout:
    json.dump(graph_list, fout)
with open('sliding_window_questions.json', 'w') as fout:
    json.dump(sliding_window_list, fout)