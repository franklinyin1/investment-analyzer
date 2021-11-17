import csv
import pprint
import pathlib
import collections
import xml.etree.ElementTree as ET

# define our working directory
sec_directory = pathlib.Path.cwd().joinpath("facebook10Q")

# define file paths to the documents
file_htm = sec_directory.joinpath('fb-20210930.htm').resolve()
file_cal = sec_directory.joinpath('fb-20210930_cal.xml').resolve()
file_lab = sec_directory.joinpath('fb-20210930_lab.xml').resolve()
file_def = sec_directory.joinpath('fb-20210930_def.xml').resolve()

# define the different storage components
storage_list = []
storage_values = {}
storage_gaap = {}

# create a named tuple
FilingTuple = collections.namedtuple('FilingTuple', ['file_path', 'namespace_element', 'namespace_label'])

#initialize my list of named tuples, I plan to parse

files_list = [
  FilingTuple(file_cal, r'{http://www.xbrl.org/2003/linkbase}calculationLink', 'calculation'),
  FilingTuple(file_def, r'{http://www.xbrl.org/2003/linkbase}definitionLink', 'definition'),
  FilingTuple(file_lab, r'{http://www.xbrl.org/2003/linkbase}labelLink','label')
]

# define two categories of labels, those I want and those I don't want
avoids = ['linkbase','roleRef']
parse = ['label', 'labelLink', 'labelArc', 'loc', 'definitionLink','definitionArc','calculationArc']

# create two sets to store my keys
lab_list = set()
cal_list = set()

# loop through each file
for file in files_list:

  # parse the file
  tree = ET.parse(file.file_path)

  # grab all the namespace elements in the tree
  elements = tree.findall(file.namespace_element)

  # loop through each element
  for element in elements:
    # if the element has children we want to parse those as well
    for child_element in element.iter():
      # split the label
      element_split_label = child_element.tag.split('}')

      #get the label parts
      namespace = element_split_label[0]
      label = element_split_label[1]

      #is this the label we want?
      if label in parse:

        # define the item type label
        element_type_label = file.namespace_label + '_' + label

        # initialize smaller dictionary
        dict_storage = {}
        dict_storage['item_type'] = element_type_label

        # grab all the attribute keys
        cal_keys = child_element.keys()

        # for each attribute do something
        for key in cal_keys:

          if '}' in key:

            new_key = key.split('}')[1]
            dict_storage[new_key] = child_element.attrib[key]

          else:
            dict_storage[key] = child_element.attrib[key]

        if element_type_label == 'label_label':

          #grab the label key
          key_store = dict_storage['label']

          #create master key
          master_key = key_store.replace('lab_','')

          #split the master key
          label_split = master_key.split('_')

          #create gaap id
          gaap_id = label_split[0] + ":" + label_split[1]

          #one Dictionary contains only the values from the XML files
          storage_values[master_key] = {}
          storage_values[master_key]['label_id'] = key_store
          storage_values[master_key]['location_id'] = key_store.replace('label_','loc_')
          storage_values[master_key]['us_gaap_id'] = gaap_id
          storage_values[master_key]['us_gaap_value'] = None
          storage_values[master_key][element_type_label] = dict_storage

          #the other dictionary will only contain the values related to GAAP metrics
          storage_gaap[gaap_id] = {}
          storage_gaap[gaap_id]['id'] = gaap_id
          storage_gaap[gaap_id]['master_id'] = master_key

        #add to dictionary
        storage_list.append([file.namespace_label, dict_storage])

'''
    PARSE THE HTM 10Q File
'''

# load the XML file
tree = ET.parse(file_htm)

# loop thorugh all the elements
for element in tree.iter():


  if 'nonNumeric' in element.tag:

    # Grab the attribute name and the master ID
    attr_name = element.attrib['name']
    gaap_id = storage_gaap[attr_name]['master_id']

    storage_gaap[attr_name]['context_ref'] = element.attrib['contextRef']
    storage_gaap[attr_name]['context_id'] = element.attrib['id']
    storage_gaap[attr_name]['continued_at'] = element.attrib.get('continuedAt','null')
    storage_gaap[attr_name]['escape'] = element.attrib.get('escape', 'null')
    storage_gaap[attr_name]['format'] = element.attrib.get('format','null')

  # same for nonFraction tags
  if 'nonFraction' in element.tag:

    # grab the attribute name and the master ID
    attr_name = element.attrib['name']
    gaap_id = storage_gaap[attr_name]['master_id']

    storage_gaap[attr_name]['context_ref'] = element.attrib['contextRef']
    storage_gaap[attr_name]['fraction_id'] = element.attrib['id']
    storage_gaap[attr_name]['unit_ref'] = element.attrib.get('unitRef','null')
    storage_gaap[attr_name]['decimals'] = element.attrib.get('decimals','null')
    storage_gaap[attr_name]['scale'] = element.attrib.get('scale','null')
    storage_gaap[attr_name]['format'] = element.attrib.get('format','null')
    storage_gaap[attr_name]['value'] = element.text.strip() if element.text else 'null'

    #don't forget to store the actual value if it exists
    if gaap_id in storage_values:
      storage_values[gaap_id]['us_gaap_value'] = storage_gaap[attr_name]

file_name = 'sec_xbrl_scrape_content.csv'

with open(file_name, mode = 'w', newline='') as sec_file:

  #create a writer
  writer = csv.writer(sec_file)

  #write the header
  writer.writerow(['FILE','LABEL','VALUE'])

  #dump the dict to the csv file
  for dict_cont in storage_list:
    for item in dict_cont[1].items():
      writer.writerow([dict_cont[0]] + list(item))


file_name = 'sec_xbrl_scrape_values.csv'

with open(file_name, mode = 'w', newline='') as sec_file:

  # create a writer
  writer = csv.writer(sec_file)

  # write the header
  writer.writerow(['ID', 'CATEGORY', 'LABEL', 'VALUE'])

  # start at level
  for storage_1 in storage_values:

    # level 2
    for storage_2 in storage_values[storage_1].items():

      # if the value is a dictionary then we have one more possible level
      if isinstance(storage_2[1],dict):

        for storage_3 in storage_2[1].items():

          # write it to the csv

          writer.writerow([storage_1] + [storage_2[0]] + list(storage_3))

      else:

        if storage_2[1] != None:
          # write it to the csv
          writer.writerow([storage_1] + list(storage_2) + ['None'])



