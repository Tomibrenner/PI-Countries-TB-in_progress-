const validate = (activity) => {
    let newErrors = {};
  
    if (!activity.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(activity.name)) {
      newErrors.name = 'Name is invalid';
    }
  
    if (!activity.duration || activity.duration < 1) {
      newErrors.duration = 'Duration is required';
    }
  
    if (!parseInt(activity.difficulty)) {
      newErrors.difficulty = 'Difficulty is required';
    }
  
    if (!activity.season) {
      newErrors.season = 'Season is required';
    }
  
    if (!activity.countries || !activity.countries.length) {
      newErrors.countries = 'You must select at least one country';
    }
  
    return newErrors;
  };
  
export default validate