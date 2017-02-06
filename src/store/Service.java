package store;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


public class Service {

	Map<String, Book> store = new HashMap<>();
	
	public void addBook(Book book){
		store.put(book.getTitle(), book);
	}
	
	public void deleteBook(String title){
		store.remove(title);
	}
	
	
	public int quatityOfBooks(){
		return store.size();
	}
	
	public List<String> listBookNames(){
		List<String> books= new ArrayList<>();
		Iterator<Map.Entry<String, Book>> iter = store.entrySet().iterator();
		while(iter.hasNext()){
			books.add(iter.next().getKey());
		}
		return books;	
	}
	
	
}
