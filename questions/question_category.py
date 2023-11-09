with open('questions/raw_questions.txt') as f:
    lines = f.readlines()

def retrieve_tag(s):
    s = s[6:]
    i = 0
    while(s[i] != ']'):
        i += 1
    return s[:i]

def retrieve_sub_tag(s):
    s = s[4:]
    i = 0
    while(s[i] != '`'):
        i += 1
    return s[:i]
    
tag_dict = {}  
sub_tag_dict = {}
main_tag_flag = 1
tag = ""
sub_tag = "" 
     
for i in lines:
    if(len(i.strip()) == 0):
        continue
    elif(i.strip()[:4] == "####"):
        main_tag_flag = 1
        tag = i
        tag_dict[retrieve_tag(tag)] = []
    elif(i.strip()[:4] == "* ``"):
        main_tag_flag = 0
        sub_tag = i
        sub_tag_dict[retrieve_sub_tag(sub_tag)] = []
    elif(main_tag_flag):
        tag_dict[retrieve_tag(tag)].append(i.strip())
    else:
        tag_dict[retrieve_tag(tag)].append(i.strip())
        sub_tag_dict[retrieve_sub_tag(sub_tag)].append(i.strip())

def retrieve_number(s):
    if(len(s) == 0):
        return
    end = 0
    try:
        while(s[end] != '.'):
            end += 1
    except:
        return ''
    begin = end -1
    while(begin and s[begin] != '['):
        begin -= 1
    return s[begin + 1 : end] if s[begin] == '[' else s[begin : end]

topic_dict = {}
sub_topic_dict = {}
questions_set = []
for i in tag_dict:
    topic_dict[i] = []
    for j in tag_dict[i]:
        questions_set.append(retrieve_number(j).lstrip('0'))
        topic_dict[i].append(retrieve_number(j).lstrip('0'))

for i in sub_tag_dict:
    sub_topic_dict[i] = []
    for j in sub_tag_dict[i]:
        questions_set.append(retrieve_number(j).lstrip('0'))
        sub_topic_dict[i].append(retrieve_number(j).lstrip('0'))        

def get_questions_set():
    return questions_set

def get_topic_dict():
    return topic_dict

def get_sub_topic_dict():
    return sub_topic_dict