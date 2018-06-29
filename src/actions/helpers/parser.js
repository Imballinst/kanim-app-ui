export default data => (typeof data === 'object' ? data : JSON.parse(data));
