import json
import question_category

f = open('questions/questions.json')
data = json.load(f) 

questions_list = question_category.get_questions_set()
topic_list = question_category.get_topic_dict()
sub_topic_list = question_category.get_sub_topic_dict()

new_json = []

for i in data:
    if(i['id'] in questions_list):
        new_json.append(i)
        i['tag'] = []
        i['sub_tag'] = []
        for t in topic_list:
            if(i['id']) in topic_list[t]:
                i['tag'].append(t)
        for t in sub_topic_list:
            if(i['id']) in sub_topic_list[t]:
                i['sub_tag'].append(t)

  
for q in new_json:
    #if(len(q['tag']) > 1 or len(q['sub_tag']) > 1):
    if(len(q['tag']) > 1):    
        print(q['id'], q['tag'], q['sub_tag'])

jsonList = json.dumps(new_json)

with open("sample.json", "w") as outfile:
    outfile.write(jsonList)

print(len(questions_list))