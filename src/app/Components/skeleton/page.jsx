
import React from 'react';

function SkeletonItem() {
  return (
    <div className="border shadow rounded-md p-4  w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  const numItems = 5; // Change this to the desired number of items
  
  return (
    <div >
     <div >
     {[...Array(numItems)].map((_, index) => (
        <SkeletonItem key={index} />
      ))}
     </div>
    </div>
  );
}

export default Skeleton;
