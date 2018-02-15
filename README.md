My record collection. View it here:
http://derkatalog.surge.sh/

App build with React. Data stored in Firebase. Firebase also handles the (o)auth, so only I may add/edit records.

Images hosted/sourced/cropped via Cloudinary widget.

TODOs:

* Search 'no results' msg.
* Extend Redux-ification to include the album list? Might help with the above.
* Edit screen: if keeping sliders, use onChanged (ed!) instead of onChange so as not to hammer state? And maybe refactor to use a native range input solution or a better plugin
* Search debouncing? Seems to work OK though.
* 12" vs 7" option and filter?
