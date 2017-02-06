package store;

import java.util.Iterator;
import java.util.List;

public class Main {
	Service s  = new Service();
	
	public static void main(String[] args){
		Main m = new Main();
		
		
		Book b1 = new Book();
		Book b2 = new Book();
		Book b3 = new Book();
		
		b1.setTitle("Wigwams for children");
		b2.setTitle("Trunks for turtles");
		b3.setTitle("Hats for gnomes");
		
		m.s.addBook(b1);
		m.s.addBook(b2);
		m.s.addBook(b3);
		
		System.out.println("There are " + m.s.quatityOfBooks() + " in the store");
		
		m.listEm();
		
		m.s.deleteBook("Wigwams for children");
		
		
		m.listEm();
		
	}
	
	
	private  void listEm(){
		List<String> titles = s.listBookNames();
		Iterator<String> iter = titles.iterator();
		while(iter.hasNext()){
			System.out.println(iter.next());
		}
	}
	
	

}
