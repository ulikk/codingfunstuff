#include <iostream>
#include <cstdlib>

#define NUMBER 36000000

inline int toHouse(const int n)
{
	int presents=0;
	for (int j=1; j<=n; ++j)
	{
		if ((n%j) == 0) { presents += j*10; }
	}
	return presents;
}


int main()
{
#pragma omp parallel for
	for (int i=100000; i<1500000; ++i)
	{
		int presents=toHouse(i);

	    if (i%10000==0) {
	    	std::cout << "House " << i << " got " << presents << " presents." << std::endl;
		}
	    if (presents == NUMBER)
	    {
        std::cout << "House " << i << " got " << presents << " presents. **DONE**" << std::endl;
        exit(0);
      }
	}
}
