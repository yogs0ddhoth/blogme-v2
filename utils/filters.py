def created_at(x):
  return x.__dict__['created_at'] 
  

def format_date(date):
  return date.strftime('%m/%d/%y')

def format_fields(dict, list):
  for f in list:
    dict[f] = format_date(dict[f])
  return dict
  
def format_url(url): # url: string
  return (
    url # remove all parts of url that aren't the domain name
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0]
  )

def format_plural(amount, word):
  if amount !=1:
    return word + 's'
  
  return word
